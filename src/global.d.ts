declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.mdx' {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}
