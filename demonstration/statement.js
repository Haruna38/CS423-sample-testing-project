let x = 42; // declaration statement (1)

if (false) // condition statement (2)
// code block statement (3)
{	
	x -= 1; 
}

while (x < 10) // while statement (4)
// code block statement (5)
{
	x += 1;
}

for (
	let i = 0; // declaration statement (6)
	i < 0; // expression - not a statement
	++i // expression - also not a statement
) // for statement (7)
// code block statement (8)
{
	x = 93;
}

do x = 69; // do statement (9)
while (x < 42); // while statement (10)

console.log(x); // log statement (11)