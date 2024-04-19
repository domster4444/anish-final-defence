import { HtmlToReactParser } from "lib/utilities/utilityFunctions/utilityFunctions";

interface ChildType {
  children: React.ReactNode;
}

const HtmlParser = ({ children }: ChildType) => {
  return <>{HtmlToReactParser(children)}</>;
};

export default HtmlParser;
