import { Button } from "antd";
import {
  Provider,
  atom,
  createStore,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore,
} from "jotai";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";

const countAtom = atom(1);

const readonlyCountAtom = atom((get) => get(countAtom));

const Root = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => createStore(), []);
  return <Provider store={store}>{children}</Provider>;
};

const Comp = () => {
  const store = useStore();

  const [count, setCount] = useState(store.get(countAtom));

  useEffect(() => {
    return store.sub(countAtom, () => {
      setCount(store.get(countAtom));
    });
  }, [store]);
  return <span>{count}</span>;
};
const Comp2 = () => {
  const count = useAtomValue(countAtom);

  return <span>{count}</span>;
};

const Comp3 = () => {
  const count = useAtomValue(readonlyCountAtom);

  return (
    <div>
      <span>{count}</span>
    </div>
  );
};

const Parent = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const Action = () => {
  const store = useStore();

  console.log(store);
  store.sub(countAtom, () => {
    console.log(store.get(countAtom));
  });

  return (
    <Button onClick={() => store.set(countAtom, (count) => count + 1)}>
      +++
    </Button>
  );
};

export const JotaiStory = () => {
  return (
    <>
      <Root>
        <Parent>
          <Parent>
            <Comp />
            <Comp2 />
            <Comp3 />
          </Parent>
          <Action />
        </Parent>
      </Root>
      <Root>
        <Parent>
          <Parent>
            <Comp />
            <Comp2 />
          </Parent>
          <Action />
        </Parent>
      </Root>
    </>
  );
};
