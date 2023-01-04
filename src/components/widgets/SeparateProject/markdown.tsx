import { useRemark } from 'react-remark';
import { useEffect } from 'react';

type Props = {
  text: string;
  className?: string;
};

const MarkdownComponent = ({ text, className }: Props): JSX.Element | null => {
  const [markdown, setMarkdownSource] = useRemark({
    rehypeReactOptions: {
      components: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p: (props: any) => <p className={className} {...props} />
      }
    }
  });

  useEffect(() => {
    setMarkdownSource(text);
  }, [setMarkdownSource, text]);

  return markdown;
};

export default MarkdownComponent;
