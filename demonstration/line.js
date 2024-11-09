// comments, blank lines are brackets don't count

let x = 42;

if (false)
	x -= 1;

while (x < 10) {
	x += 1;
}

for (let i = 0; i < 0; ++i) {
	x = 93;
}

do {
	x = 69;
}
while (x < 42);

console.log(x);