can get a backtrace with [gdb](http://www.gnu.org/software/gdb/) or
 [lldb](http://lldb.llvm.org/).

 In order to do so, follow these steps:
 If you're building for the first time, run `npm run installDebug` (or `BUILD_ONLY=true npm link`)

   1. `BUILD_ONLY=true npm install` (or `BUILD_ONLY=true npm link`)
   3. `node-gyp rebuild --debug` (the same as `node-gyp clean configure --debug build`)
 Note that you should run `rm -rf build/Release` (or `rd /s /q build/Release` in Windows) to make sure a release build doesn't get loaded instead of the debug build.

 If you're doing a subsequent rebuild of NodeGit in debug, the clean function will cause
 a lot of extraneous recompilation of things you probably didn't change (like the vendor
 dependencies).

   1. `BUILD_ONLY=true npm install` (or `BUILD_ONLY=true npm link`)
   2. `rm -rf build/Release` to make sure a release build doesnt get loaded instead of the debug build.
   3. `node-gyp configure build --debug`
 If you're doing a subsequent rebuild of NodeGit in debug, the clean function will cause a lot of extraneous recompilation of things you probably didn't change (like the vendor dependencies). If you need to regenerate the C++ files and recompile you can run `npm run rebuildDebug`, or `npm run recompileDebug` if you've manually updated the C++ files and don't want them to regenerate.

 ### Installing dependencies: ###

