import { useRemark } from 'react-remark';
import { useEffect } from 'react';

type Props = {
  text: string;
  className?: string;
};

const MarkdownComponent = ({ text, className }: Props) => {
  const [markdown, setMarkdownSource] = useRemark({
    rehypeReactOptions: {
      components: {
        p: (props: any) => <p className={className} {...props} />,
      },
    },
  });

  useEffect(() => {
    setMarkdownSource(text);
  }, []);

  return markdown;
};

export default MarkdownComponent;
