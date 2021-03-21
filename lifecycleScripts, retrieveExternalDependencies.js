if ((name == "libssh2") && (process.platform !== "win32")) {
               return new Promise(function(resolve, reject) {
                 console.info("[nodegit] Configuring libssh2.");
                 cp.exec(
                 cp.execFile(
                   rooted(vendorPath) + "configure",
                   {cwd: rooted(vendorPath)},
                   function(err, stdout, stderr) {
