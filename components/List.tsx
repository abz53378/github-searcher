import { Empty } from "antd";
import { useState } from "react";

type Props<T extends Record<string, unknown>> = {
  renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactElement
  items: Array<T>,
  itemHeight: number;
  windowHeight: number;
  onScroll?: ({startIndex: number}) =>void;
}

export default function List<T extends Record<string, unknown>>(props: Props<T>) {
  const {windowHeight, itemHeight, items, renderItem, onScroll} = props;
  const [index, setIndex] = useState(0);
  const renderItemSize = Math.ceil(windowHeight / itemHeight) + 1;
  const handleScroll = e => {
    const {
      scrollTop,
    } = e.target;
    const startIndex = Math.floor(scrollTop / itemHeight);
    setIndex(startIndex);
    onScroll && onScroll({
      startIndex
    });
  }

  if (!items.length) {
    return <Empty style={{padding: 64, background: 'fff', margin: 0}} description={'No data'}/>;
  }

  return (
    <div style={{
        height: windowHeight,
        overflow: "auto"
      }}
      onScroll={handleScroll}
    >
      <div style={{
        position: "relative",
        height: items.length * itemHeight
      }}>
        {items.slice(index, index + renderItemSize)
          .map((item, i) => renderItem(item, index + i, {height: itemHeight, position: 'absolute', width: '100%', top: (index + i) * itemHeight}))
        }
      </div>

    </div>
  )
}