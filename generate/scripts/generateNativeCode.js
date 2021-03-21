const path = require("path");
const promisify = require("promisify-node");
const fse = promisify(require("fs-extra"));
const exec = promisify(function(command, opts, callback) {
  return require("child_process").exec(command, opts, callback);
});
const utils = require("./utils");
module.exports = function generateNativeCode() {
  const combyne = require("combyne");
  const js_beautify = require("js-beautify").js_beautify;
  const beautify = function (input) {
    return js_beautify(input, {
      "brace_style": "end-expand",
      "max_preserve_newlines": 2,
      "preserve_newlines": true,
      "indent_size": 2,
      "indent_char": " "
    });
  };
  // Customize the delimiters so as to not process `{{{` or `}}}`.
  combyne.settings.delimiters = {
    START_RAW: "{{=",
    END_RAW: "=}}"
   };

   var partials = {
     asyncFunction: utils.readFile("combyne/partials/async_function.cc"),
     callbackHelpers: utils.readFile("combyne/partials/callback_helpers.cc"),
     convertFromV8: utils.readFile("combyne/partials/convert_from_v8.cc"),
     convertToV8: utils.readFile("combyne/partials/convert_to_v8.cc"),
     doc: utils.readFile("combyne/partials/doc.cc"),
     fields: utils.readFile("combyne/partials/fields.cc"),
     guardArguments: utils.readFile("combyne/partials/guard_arguments.cc"),
     syncFunction: utils.readFile("combyne/partials/sync_function.cc"),
     fieldAccessors: utils.readFile("combyne/partials/field_accessors.cc")
     asyncFunction: utils.readFile("templates/partials/async_function.cc"),
     callbackHelpers: utils.readFile("templates/partials/callback_helpers.cc"),
     convertFromV8: utils.readFile("templates/partials/convert_from_v8.cc"),
     convertToV8: utils.readFile("templates/partials/convert_to_v8.cc"),
     doc: utils.readFile("templates/partials/doc.cc"),
     fields: utils.readFile("templates/partials/fields.cc"),
     guardArguments: utils.readFile("templates/partials/guard_arguments.cc"),
     syncFunction: utils.readFile("templates/partials/sync_function.cc"),
     fieldAccessors: utils.readFile("templates/partials/field_accessors.cc")
   };

   var templates = {
     class_content: utils.readFile("combyne/templates/class_content.cc"),
     struct_content: utils.readFile("combyne/templates/struct_content.cc"),
     class_header: utils.readFile("combyne/templates/class_header.h"),
     struct_header: utils.readFile("combyne/templates/struct_header.h"),
     binding: utils.readFile("combyne/templates/binding.gyp"),
     nodegitCC: utils.readFile("combyne/templates/nodegit.cc"),
     nodegitJS: utils.readFile("combyne/templates/nodegit.js"),
     enums: utils.readFile("combyne/templates/enums.js")
     class_content: utils.readFile("templates/templates/class_content.cc"),
     struct_content: utils.readFile("templates/templates/struct_content.cc"),
     class_header: utils.readFile("templates/templates/class_header.h"),
     struct_header: utils.readFile("templates/templates/struct_header.h"),
     binding: utils.readFile("templates/templates/binding.gyp"),
     nodegitCC: utils.readFile("templates/templates/nodegit.cc"),
     nodegitJS: utils.readFile("templates/templates/nodegit.js"),
     enums: utils.readFile("templates/templates/enums.js")
   };

   var filters = {
     upper: require("../combyne/filters/upper"),
     replace: require("../combyne/filters/replace"),
     titleCase: require("../combyne/filters/title_case"),
     or: require("../combyne/filters/or"),
     and: require("../combyne/filters/and"),
     defaultValue: require("../combyne/filters/default_value"),
     argsInfo: require("../combyne/filters/args_info"),
     cppToV8: require("../combyne/filters/cpp_to_v8"),
     jsArgsCount: require("../combyne/filters/js_args_count"),
     isV8Value: require("../combyne/filters/is_v8_value"),
     isPointer: require("../combyne/filters/is_pointer"),
     isDoublePointer: require("../combyne/filters/is_double_pointer"),
     isOid: require("../combyne/filters/is_oid"),
     unPointer: require("../combyne/filters/un_pointer"),
     payloadFor: require("../combyne/filters/payload_for"),
     hasReturnType: require("../combyne/filters/has_return_type"),
     hasReturns: require("../combyne/filters/has_returns"),
     returnsCount: require("../combyne/filters/returns_count"),
     returnsInfo: require("../combyne/filters/returns_info"),
     fieldsInfo: require("../combyne/filters/fields_info")
     upper: require("../templates/filters/upper"),
     replace: require("../templates/filters/replace"),
     titleCase: require("../templates/filters/title_case"),
     or: require("../templates/filters/or"),
     and: require("../templates/filters/and"),
     defaultValue: require("../templates/filters/default_value"),
     argsInfo: require("../templates/filters/args_info"),
     cppToV8: require("../templates/filters/cpp_to_v8"),
     jsArgsCount: require("../templates/filters/js_args_count"),
     isV8Value: require("../templates/filters/is_v8_value"),
     isPointer: require("../templates/filters/is_pointer"),
     isDoublePointer: require("../templates/filters/is_double_pointer"),
     isOid: require("../templates/filters/is_oid"),
     unPointer: require("../templates/filters/un_pointer"),
     payloadFor: require("../templates/filters/payload_for"),
     hasReturnType: require("../templates/filters/has_return_type"),
     hasReturns: require("../templates/filters/has_returns"),
     returnsCount: require("../templates/filters/returns_count"),
     returnsInfo: require("../templates/filters/returns_info"),
     fieldsInfo: require("../templates/filters/fields_info")
   };

   // Convert Buffers to Combyne templates.
 @@ -100,7 +100,7 @@ module.exports = function generateNativeCode() {
   fse.remove(path.resolve(__dirname, "../../src")).then(function() {
     return fse.remove(path.resolve(__dirname, "../../include"));
   }).then(function() {
     return fse.copy(path.resolve(__dirname, "../combyne/manual/"), path.resolve(__dirname, "../../"));
     return fse.copy(path.resolve(__dirname, "../templates/manual/"), path.resolve(__dirname, "../../"));
   }).then(function() {
     // Write out single purpose templates.
     utils.writeFile("../binding.gyp", beautify(templates.binding.render(enabled)));
