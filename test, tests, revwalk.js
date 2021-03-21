  });
   });

   it("can get a specified number of commits", function() {
     var test = this;
     var storedCommits;
     return test.walker.getCommits()
       .then(function(commits) {
         assert.equal(commits.length, 10);
         storedCommits = commits;
         test.walker = test.repository.createRevWalk();
         test.walker.push(test.commit.id());

         return test.walker.getCommits(8);
       })
       .then(function(commits) {
         assert.equal(commits.length, 8);
         for (var i = 0; i < 8; i++) {
           assert.equal(commits[i].toString(), storedCommits[i].toString());
         }
       });
   });

   it("can get commits until you tell it not to", function() {
     var test = this;
     var magicSha = "b8a94aefb22d0534cc0e5acf533989c13d8725dc";

     function checkCommit(commit) {
       return commit.toString() != magicSha;
     }

     return test.walker.getCommitsUntil(checkCommit)
       .then(function(commits) {
         assert.equal(commits.length, 4);
         assert.equal(commits[commits.length-1].toString(), magicSha);
       });
   });

   // This test requires forcing garbage collection, so mocha needs to be run
   // via node rather than npm, with a la `node --expose-gc [pathtohmoca]
   // [testglob]`
