// my-reporter.js

'use strict';

const Mocha = require('mocha');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class MyReporter {
  constructor(runner) {
    const stats = runner.stats;
    this.indents = 0;

    let startTime;

    let details = "";

    runner
      .once(EVENT_RUN_BEGIN, () => {
        startTime = new Date();
      })
      .on(EVENT_SUITE_BEGIN, (suite) => {
        if (!suite.title) return;
        details += `${this.tabs()}**${suite.title}**\n\n`;
        ++this.indents;
      })
      .on(EVENT_SUITE_END, (suite) => {
        if (!suite.title) return;
        --this.indents;
      })
      .on(EVENT_TEST_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        // console.log(`${this.indent()}pass: ${test.fullTitle()}`);
        details += `${this.tabs()}✅ **${test.title}**\n\n`;
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        details += `${this.tabs()}❌ **${test.title}**<br>&nbsp;${this.tabs(++this.indents)}${err.message || "Unknown reason"}\n\n`;
        --this.indents;
      })
      .once(EVENT_RUN_END, () => {
        let { passes, failures } = stats, all = passes + failures;
        console.log(`# Test Summary\n` +
          `Performed on ${startTime.toUTCString()}\n` +
          `## Unit Tests Summary\n` + 
          `| ✅ Passes | ❌ Failure | 📋 Total |\n` + 
          `| :-: | :-: | :-: |\n` +
          `| ${passes}<br>(${(passes / all * 100).toFixed(2)}%) | ${failures}<br>(${(failures / all * 100).toFixed(2)}%) | ${all}<br>(100.00%) |\n` +
          `## Test Case Details\n` +
          details + "\n" +
          `## Code Coverage`
        )
      });
  }

  tabs () {
    return "&nbsp;".repeat(this.indents * 5);
  }
}

module.exports = MyReporter;