import { faker } from '@faker-js/faker';
import { FC } from 'react';
import PokeBallButton from '@components/molecule/button/pokeBallButton';
import styled from '@emotion/styled';

interface Props {
  id: number;
  src: string;
  name: string;
  isShowPokeBall?: boolean;
}

const PokemonItem: FC<Props> = ({ id, name, src, isShowPokeBall = false }) => {
  return (
    <div style={{ width: '300px', height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImgBox src={src} alt={'pokemon'}></ImgBox>
        {isShowPokeBall && <PokeBallButton id={id}></PokeBallButton>}
      </div>
      <h4>{name}</h4>
      <b>Attack</b>: {faker.number.int({ max: 1000 })}
      <br />
      <b>Defense</b>: {faker.number.int({ max: 1000 })}
      <br />
      <b>Speed</b>: {faker.number.int({ max: 1000 })}
    </div>
  );
};

export default PokemonItem;

const ImgBox = styled.img`
  animation: motion 0.3s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      padding-top: 15px;
    }
    100% {
      padding-bottom: 15px;
    }
  }
`;