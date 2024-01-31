import "antd/dist/antd.less";

import Table from "../components/Table";
import { Button } from "antd";

export const TestStory = () => {
  return <Table toolbar={() => [<Button>1</Button>, <Button>2</Button>]} />;
};
