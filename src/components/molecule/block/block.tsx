import { CSSProperties, FC } from 'react';

interface Props {
  style?: CSSProperties;
}

const Block: FC<Props> = ({ style }) => {
  return <div style={style ? style : { height: '1rem', width: '10rem' }}></div>;
};

export default Block;
