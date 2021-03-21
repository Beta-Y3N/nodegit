 }

   builder = path.resolve(".", "node_modules", ".bin", builder);
   builder = builder.replace(/\s/g, "\\$&");
   var cmd = [prefix, builder, "rebuild", target, debug, distUrl]
     .join(" ").trim();
