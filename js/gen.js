 function* generate () {
    for(let i = 0; i < 10; i++) {
        yield i;
    }
}

let gen = generate ();

for(let m of gen) {
    console.log(m);
}

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

function show() {
    console.log('Step 1');
    yield

    console.log('Step 2');
    yield

    console.log('Step 3');
    yield
}

let s = show();
s.next();
s.next();