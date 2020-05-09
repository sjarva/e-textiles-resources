import { FunctionComponent, ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const Heading: FunctionComponent<HeadingProps> = ({ children, level }) => {
  const Header = `h${level + 1}` as HeadingTag;
  return <Header>{children}</Header>;
};

export default Heading;
