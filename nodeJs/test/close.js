var tasks = [];
for (var i=0; i<3; i++) {
    (function(n) {
        tasks.push(function() {
            console.log('>>> ' + n);
        });
    })(i);
}
for (j=0; j<tasks.length; j++) {
    tasks[j]();
}