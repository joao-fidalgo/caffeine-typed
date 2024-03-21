import ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import * as fs from 'fs';
import * as path from 'node:path';

const configFile = 'caffeine.json';

const plugin: tstl.Plugin = {
  beforeEmit(
    program: ts.Program,
    options: tstl.CompilerOptions,
    emitHost: tstl.EmitHost
  ) {
    void program;
    void options;
    void emitHost;

    if (!options.outDir)
      throw new Error("No 'outDir' specified in compiler options !");

    if (!fs.existsSync(options.outDir)) {
      fs.mkdirSync(options.outDir);
    }

    fs.copyFileSync(configFile, path.join(options.outDir, configFile));
  },
};

export default plugin;
