import { Typography as Typo, TypographyProps } from '@lobehub/ui';
import { mdxComponents } from '@lobehub/ui/mdx';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { FC } from 'react';
import remarkGfm from 'remark-gfm';

import CodeBlock from './CodeBlock';
import Link from './Link';

export const Typography = ({
  children,
  mobile,
  style,
  ...rest
}: { mobile?: boolean } & TypographyProps) => {
  const headerMultiple = mobile ? 0.25 : 0.5;
  return (
    <Typo headerMultiple={headerMultiple} style={{ width: '100%', ...style }} {...rest}>
      {children}
    </Typo>
  );
};

export const CustomMDX: FC<MDXRemoteProps & { mobile?: boolean }> = ({ mobile, ...rest }) => {
  // ref: https://github.com/hashicorp/next-mdx-remote/issues/405
  const list: any = {};
  Object.entries({
    ...mdxComponents,
    a: Link,
    pre: CodeBlock,
    ...rest.components,
  }).forEach(([key, Render]: any) => {
    list[key] = (props: any) => <Render {...props} />;
  });

  return (
    <Typography mobile={mobile}>
      <MDXRemote
        {...rest}
        components={list}
        // @ts-ignore
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </Typography>
  );
};