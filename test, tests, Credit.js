var sshPrivateKey = path.resolve("./id_rsa");

   it("can create default credentials", function() {
     NodeGit.Cred.defaultNew().then(function (defaultCreds) {
       assert(defaultCreds instanceof NodeGit.Cred);
     });
     var defaultCreds = NodeGit.Cred.defaultNew();
     assert(defaultCreds instanceof NodeGit.Cred);
   });

   it("can create ssh credentials using passed keys", function() {
 @@ -23,9 +22,8 @@ describe("Cred", function() {
   });

   it("can create credentials using plaintext", function() {
     NodeGit.Cred.userpassPlaintextNew("username", "password")
     .then(function (plaintextCreds) {
       assert(plaintextCreds instanceof NodeGit.Cred);
     });
     var plaintextCreds = NodeGit.Cred.userpassPlaintextNew
       ("username", "password");
     assert(plaintextCreds instanceof NodeGit.Cred);
   });
 });
