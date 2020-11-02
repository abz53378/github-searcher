import { Empty } from "antd";
import { useState } from "react";

type Props<T extends Record<string, unknown>> = {
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactElement
  items: Array<T>,
  itemHeight: number;
  visibleItemSize: number;
  onScrollToBottom?: () =>void;
  bottomOffset?: number;
}

export default function List<T extends Record<string, unknown>>(props: Props<T>) {
  const {visibleItemSize, itemHeight, items, renderItem, onScrollToBottom, bottomOffset = 0} = props;
  const [index, setIndex] = useState(0);
  const onScroll = e => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = e.target;
    const currentIndex = Math.floor(scrollTop / itemHeight);
    setIndex(currentIndex);
    if (scrollHeight - scrollTop - bottomOffset <= clientHeight ) {
      onScrollToBottom && onScrollToBottom();
    }
  }

  if (!items.length) {
    return <Empty style={{padding: 64}} description={null}/>;
  }

  return (
    <div style={{
        height: visibleItemSize * itemHeight,
        overflow: "auto"
      }}
      onScroll={onScroll}
    >
      <div style={{
        position: "relative",
        height: items.length * itemHeight
      }}>
        {items.slice(index, index + visibleItemSize + 1) // add one item size for buffer
          .map((item, i) => renderItem(item, index + i, {height: itemHeight, position: 'absolute', width: '100%', top: (index + i) * itemHeight}))
        }
      </div>

    </div>
  )
}