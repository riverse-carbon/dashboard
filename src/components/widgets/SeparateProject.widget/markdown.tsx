import { useRemark } from 'react-remark';
import { useEffect } from 'react';

const MarkdownComponent = ({ text, className }: { text: string; className: string }) => {
  const [markdown, setMarkdownSource] = useRemark({
    rehypeReactOptions: {
      components: {
        p: (props:any) => <p className={className} {...props} />,
      },
    },
  });

  useEffect(() => {
    setMarkdownSource(text);
  }, []);

  return markdown;
};

export default MarkdownComponent;
