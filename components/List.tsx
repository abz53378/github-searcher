import { useState } from "react";

type Props<T extends Record<string, any>> = {
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactElement
  items: Array<T>,
  itemHeight: number;
  visibleItemSize: number;
  onScrollToBottom?: () =>void;
}

export default function List<T extends Record<string, any>>(props: Props<T>) {
  const {visibleItemSize, itemHeight, items, renderItem, onScrollToBottom} = props;
  const [index, setIndex] = useState(0);
  const onScroll = e => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = e.target;
    if (scrollHeight - scrollTop === clientHeight ) {
      onScrollToBottom && onScrollToBottom();
    }
    const currentIndex = Math.floor(scrollTop / itemHeight);
    setIndex(currentIndex);
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