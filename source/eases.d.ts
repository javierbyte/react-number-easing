declare module 'eases' {
  const eases: Record<string, (progress: number) => number>;

  export default eases;
}
