"use client";

import { format, getFromATH, getToATH, round } from "@/utils";
import { Coin, getCoin } from "@/services/coins";
import { Currence, getCurrencies } from "@/services/currencies";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  .ant-input {
    width: 250px;
  }

  .ant-select-selector {
    width: 250px !important;
  }
`;

const Title = styled.h1`
  font-size: 23px;
  font-weight: 500;
`;

export default function WatchList() {
  const [currencies, setCurrencies] = useState<Currence[]>([]);
  const [coin, setCoin] = useState<Coin>();

  useEffect(() => {
    getCurrencies(30).then(({ data }) => setCurrencies(data));
    getCoin("bitcoin").then(({ data }) => setCoin(data));
  }, []);

  const findCoin = (name: string, coin: Coin | undefined) => {
    return name === coin?.name ? coin : null;
  };

  const columns: ColumnsType<Currence> = [
    {
      title: "Name",
      render: (_, { name }) => name,
    },
    {
      title: "Price USD",
      ellipsis: true,
      render: (_, { values }) => `$ ${format(values.USD.price)}`,
    },
    {
      title: "Circulating Supply",
      ellipsis: true,
      render: (_, { symbol, circulatingSupply }) =>
        `${symbol} ${format(circulatingSupply)}`,
    },
    {
      title: "Market Cap",
      ellipsis: true,
      render: (_, { values, circulatingSupply }) =>
        `$ ${format(values.USD.price * circulatingSupply)}`,
    },
    {
      title: "Category",
      render: (_, { category }) => category,
    },
    {
      title: "From ATH",
      render: (_, { name }) => {
        const fromATH = getFromATH(findCoin(name, coin));

        return fromATH ? `${fromATH} %` : null;
      },
    },
    {
      title: "To ATH",
      render: (_, { name }) => {
        const toATH = getToATH(findCoin(name, coin));

        return toATH ? `${toATH} %` : null;
      },
    },
  ];

  return (
    <Wrapper>
      <Title>Watchlist</Title>

      <Table
        columns={columns}
        rowKey="id"
        dataSource={currencies}
        size="small"
        scroll={{ y: 400 }}
      />
    </Wrapper>
  );
}
