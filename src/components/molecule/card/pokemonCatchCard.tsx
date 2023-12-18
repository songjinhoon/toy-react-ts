import { faker } from '@faker-js/faker';
import styled from '@emotion/styled';
import PokeBallButton from '@components/molecule/button/pokeBallButton';
import useUser, { IUseUserHook } from '@hooks/useUser';
import usePokemon from '@hooks/usePokemon';

const PokemonCatchCard = ({ id }: { id: number }) => {
  const { user }: IUseUserHook = useUser();
  const { useGetPokemonQuery } = usePokemon();
  const pokemon = useGetPokemonQuery(id);

  const isDisableButton =
    user && user.pokemons.filter((data: number) => data === id).length !== 0;

  return (
    <>
      {pokemon && (
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImgBox
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={'pokemon'}
            ></ImgBox>
            {!isDisableButton && <PokeBallButton id={id}></PokeBallButton>}
          </div>
          <h4>{pokemon.name}</h4>
          <b>Attack</b>: {faker.number.int({ max: 1000 })}
          <br />
          <b>Defense</b>: {faker.number.int({ max: 1000 })}
          <br />
          <b>Speed</b>: {faker.number.int({ max: 1000 })}
        </div>
      )}
    </>
  );
};

export default PokemonCatchCard;

const ImgBox = styled.img`
  margin-left: 30px;
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