import { useRemark } from 'react-remark';
import { useEffect } from 'react';

const MarkdownComponent = ({ text }: { text: string }) => {
  const [markdown, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(text);
  }, []);

  return markdown;
};

export default MarkdownComponent;
