import { env } from 'process';
import ts from 'typescript';
import * as tstl from 'typescript-to-lua';

const toInject = `local Unlocker, Caffeine, ${env.PROJECT_NAME} = ...\n`;

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

    for (const file of result) {
      file.code = toInject + file.code;
    }
  },
};

export default plugin;
