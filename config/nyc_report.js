'use strict';
const { ReportBase } = require('istanbul-lib-report');

const HEADERS = ["File", "Statements (%)", "Lines (%)", "Branches (%)", "Functions (%)", "Uncovered line(s)"];
const STYLES = [":--", "--:", "--:", "--:", "--:", "-"];

function nodeMissing(node) {
    if (node.isSummary()) {
        return '';
    }

    const metrics = node.getCoverageSummary();
    const isEmpty = metrics.isEmpty();
    const lines = isEmpty ? 0 : metrics.lines.pct;

    let coveredLines;

    const fileCoverage = node.getFileCoverage();
    if (lines === 100) {
        const branches = fileCoverage.getBranchCoverageByLine();
        coveredLines = Object.entries(branches).map(([key, { coverage }]) => [
            key,
            coverage === 100
        ]);
    } else {
        coveredLines = Object.entries(fileCoverage.getLineCoverage());
    }

    let newRange = true;
    const ranges = coveredLines
        .reduce((acum, [line, hit]) => {
            if (hit) newRange = true;
            else {
                line = parseInt(line);
                if (newRange) {
                    acum.push([line]);
                    newRange = false;
                } else acum[acum.length - 1][1] = line;
            }

            return acum;
        }, [])
        .map(range => {
            const { length } = range;

            if (length === 1) return range[0];

            return `${range[0]}-${range[1]}`;
        });

    return [].concat(...ranges).join(',');
}

function nodeName(node) {
	return node.getRelativeName() || 'All files';
}

function depthFor(node) {
	let ret = 0;
	node = node.getParent();
	while (node) {
		ret += 1;
		node = node.getParent();
	}
	return ret;
}

function makeLine() {
	return "| " + STYLES.join(" | ") + " |";
}

function tableHeader() {
	return "| " + HEADERS.join(" | ") + " |";
}

function tableRow(
	node,
	nodeDepth,
	skipEmpty,
	skipFull
) {
	const name = nodeName(node);
	const metrics = node.getCoverageSummary();
	const isEmpty = metrics.isEmpty();
	if (skipEmpty && isEmpty) {
		return '';
	}
	if (skipFull && isFull(metrics)) {
		return '';
	}

	const mm = {
		statements: isEmpty ? 0 : metrics.statements.pct,
		branches: isEmpty ? 0 : metrics.branches.pct,
		functions: isEmpty ? 0 : metrics.functions.pct,
		lines: isEmpty ? 0 : metrics.lines.pct
	};

	return `${"&nbsp;".repeat(nodeDepth * 5)}${name} | ${mm.statements} | ${mm.branches} | ${mm.functions} | ${mm.lines} | ${nodeMissing(node)} |`;
}

class MarkdownReport extends ReportBase {
	constructor(opts) {
		super(opts);

		opts = opts || {};

		this.file = opts.file || null;
		this.cw = null;
		this.skipEmpty = opts.skipEmpty;
		this.skipFull = opts.skipFull;
	}

	onStart(root, context) {
		this.cw = context.writer.writeFile(this.file);

		this.cw.println(tableHeader());
		this.cw.println(makeLine());
	}

	onSummary(node, context) {
		const nodeDepth = depthFor(node);
		const row = tableRow(
			node,
			nodeDepth,
			this.skipEmpty,
			this.skipFull
		);
		if (row) {
			this.cw.println(row);
		}
	}

	onDetail(node, context) {
		return this.onSummary(node, context);
	}

	onEnd() {
		this.cw.close();
	}
}

module.exports = MarkdownReport;