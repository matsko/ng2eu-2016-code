import { AnimationEntryCompileResult } from '../animation/animation_compiler';
import { CompileDirectiveMetadata, CompilePipeMetadata } from '../compile_metadata';
import { CompilerConfig } from '../config';
import * as o from '../output/output_ast';
import { TemplateAst } from '../template_parser/template_ast';
import { ComponentFactoryDependency, ViewFactoryDependency } from './view_builder';
import { AnimationSummary } from "../animation/animation_summary";
export { ComponentFactoryDependency, ViewFactoryDependency } from './view_builder';
export declare class ViewCompileResult {
    statements: o.Statement[];
    viewFactoryVar: string;
    dependencies: Array<ViewFactoryDependency | ComponentFactoryDependency>;
    constructor(statements: o.Statement[], viewFactoryVar: string, dependencies: Array<ViewFactoryDependency | ComponentFactoryDependency>);
}
export declare class ViewCompiler {
    private _genConfig;
    constructor(_genConfig: CompilerConfig);
    compileComponent(component: CompileDirectiveMetadata, template: TemplateAst[], styles: o.Expression, pipes: CompilePipeMetadata[], animationSummary: AnimationSummary, compiledAnimations: AnimationEntryCompileResult[]): ViewCompileResult;
}
