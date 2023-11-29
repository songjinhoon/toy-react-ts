import React, { FC, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import useIntersect from '@hooks/useIntersect';
import styled from '@emotion/styled';
import { pokemonFetcher } from '@utils/fetcher';
import PokemonCardGroup from '@components/organism/card/pokemonCardGroup';

const CardBox = styled.div`
  /*display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: auto;*/
`;

const size = 18;

const PokemonCard: FC<any> = () => {
  const check = useRef<any>();
  const [renderLoading, setRenderLoading] = useState(false);
  const [groups, setGroups] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [position, setPosition] = useState<any>();
  const { data, mutate, isLoading } = useSWR<any>(
    `https://pokeapi.co/api/v2/pokemon?offset=${size * page}&limit=${size}`,
    pokemonFetcher,
    {
      dedupingInterval: 60000,
    },
  );

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      setPage((prevState) => ++prevState);
      setPosition(window.scrollY);
    },
    {
      root: null,
      rootMargin: '',
      threshold: 1,
    },
  );

  useEffect(() => {
    if (!isLoading && data) {
      const array: any[] = [];
      for (let i = 0; i < data.results.length; i += 3) {
        array.push(data.results.slice(i, i + 3));
      }
      setGroups((prevState: any) => prevState.concat(array));
      console.log(data);
      // setGroups((prevState: any) => prevState.concat(data.results));
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (position) {
      setRenderLoading(true);
      setTimeout(() => {
        setRenderLoading(false);
      }, 1000);
    }
  }, [position]);

  setTimeout(() => {
    if (check.current) {
      check.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
      setTimeout(() => {
        setRenderLoading(false);
      }, 100);
    }
  }, 1000);

  return (
    <>
      {/*{renderLoading && <Spinner />}*/}
      {!isLoading && groups.length !== 0 && (
        <CardBox>
          {groups.map((group: any, index: number) => (
            <div key={index}>
              {index !== groups.length - 1 && index !== groups.length - 6 && (
                <div>
                  {/*<p>{group.name}</p>
                  <p>{group.url}</p>*/}
                  <PokemonCardGroup datas={group}></PokemonCardGroup>
                </div>
              )}
              {index === groups.length - 6 && groups.length !== 6 && (
                <div ref={check}></div>
              )}
              {index === groups.length - 1 && (
                <div ref={ref}>
                  <PokemonCardGroup datas={group}></PokemonCardGroup>
                </div>
              )}
            </div>
          ))}
        </CardBox>
      )}
    </>
  );
};

export default PokemonCard;
