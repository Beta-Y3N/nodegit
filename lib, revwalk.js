var NodeGit = require("../");
 var Revwalk = NodeGit.Revwalk;
 var Promise = require("nodegit-promise");

 var oldSorting = Revwalk.prototype.sorting;

 @@ -55,4 +56,61 @@ Revwalk.prototype.walk = function(oid, callback) {
   walk();
 };


 /**
  * Walk the history grabbing commits until the checkFn called with the
  * current commit returns false.
  *
  * @param  {Function} checkFn
  * @return {Array}
  */
 Revwalk.prototype.getCommitsUntil = function(checkFn) {
   var commits = [];
   var walker = this;

   function walkCommitsCb() {
     return walker.next().then(function(oid) {
       if (!oid) { return; }

       return walker.repo.getCommit(oid).then(function(commit) {
         commits.push(commit);
         if (checkFn(commit)) {
           return walkCommitsCb();
         }
       });
     });
   }

   return walkCommitsCb().then(function() {
     return commits;
   });
 };

 /**
  * Get some of commits.
  *
  * @param  {Number} count (default: 10)
  * @return {Array}
  */
 Revwalk.prototype.getCommits = function(count) {
   count = count || 10;
   var promises = [];
   var walker = this;

   function walkCommitsCount(count) {
     if (count === 0) { return; }

     return walker.next().then(function(oid) {
       if (!oid) { return; }

       promises.push(walker.repo.getCommit(oid));
       return walkCommitsCount(count - 1);
     });
   }

   return walkCommitsCount(count).then(function() {
     return Promise.all(promises);
   });
 };

 module.exports = Revwalk;
