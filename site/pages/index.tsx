import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Heading from '../components/Heading';

interface Content {
  content: string;
}

interface Resource {
  title: string;
  resources: Content[];
}

interface HomeProps {
  resources: Resource[];
}

const Home: NextPage<HomeProps> = ({ resources }) => (
  <Layout>
    {resources.map((resource) => (
      <div key={resource.title} className="layout">
        <h2>{resource.title}</h2>
        {resource.resources.map((item, i) => (
          <div className="markdown-wrapper" key={`${resource.title}-${i}`}>
            <ReactMarkdown
              source={item.content}
              renderers={{ heading: Heading }}
            />
          </div>
        ))}
      </div>
    ))}
  </Layout>
);

export const getStaticProps = async () => {
  const resourcesDirectory = path.join(process.cwd(), '../resources');
  const directories = fs.readdirSync(resourcesDirectory);

  const content = directories.reduce<any[]>((acc: any[], curr: string) => {
    const dirPath = path.join(resourcesDirectory, curr);
    const fileNames = fs.readdirSync(dirPath);
    const fileContents = fileNames.map((filename) => {
      const filePath = path.join(dirPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      return {
        content: matter(fileContent).content,
      };
    });
    return [{ title: curr, resources: fileContents }, ...acc];
  }, []);

  return {
    props: {
      resources: content,
    },
  };
};
export default Home;
