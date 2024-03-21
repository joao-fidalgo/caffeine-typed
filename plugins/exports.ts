import { env } from 'process';
import ts from 'typescript';
import * as tstl from 'typescript-to-lua';
import * as path from 'node:path';

const toReplace = 'return ____exports\n';

const plugin: tstl.Plugin = {
  beforeEmit(
    program: ts.Program,
    options: tstl.CompilerOptions,
    emitHost: tstl.EmitHost,
    result: tstl.EmitFile[]
  ) {
    void program;
    void options;
    void emitHost;

    if (!options.outDir)
      throw new Error("No 'outDir' specified in compiler options !");

    const outPath = path.resolve(options.outDir);

    for (const file of result) {
      if (!file.code.includes(toReplace)) continue;

      const path = file.outputPath
        .replace(outPath, '')
        .replace(/^\/|\\/, '')
        .replace(/[/\\]/g, '.')
        .replace('.lua', '');

      file.code = file.code.replace(
        toReplace,
        `${env.PROJECT_NAME}["${path}"] = ____exports\n`
      );
    }
  },
};

export default plugin;
