"use client";

import { format } from "@/utils";
import { Currence, getCurrencies } from "@/services/currencies";
import { SwapOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
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

const Currencies = styled.div`
  display: flex;
  gap: 20px;
`;

const Result = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Amound = styled.div`
  font-size: 12px;
  color: #4a4a4a;
  margin-bottom: 5px;
`;

export default function Converter() {
  const [amount, setAmount] = useState<string>("1");
  const [currencies, setCurrencies] = useState<Currence[]>([]);
  const [currence1, setCurrence1] = useState<Currence>();
  const [currence2, setCurrence2] = useState<Currence>();
  const [result, setResult] = useState<string>();

  useEffect(() => {
    const usdCurrence = {
      name: "United States Dollar",
      symbol: "USD",
      slug: "USD",
      values: { USD: { price: 1 } },
    } as Currence;

    getCurrencies(30).then(({ data }) => {
      setCurrencies([...data, usdCurrence]);
      setCurrence1(data.find(({ slug }) => slug === "bitcoin"));
      setCurrence2(usdCurrence);
    });
  }, []);

  useEffect(() => {
    if (currence1 && currence2) {
      const currentAmount = parseFloat(amount);

      const value =
        currentAmount === 0
          ? "0.00"
          : (currence1.values.USD.price / currence2.values.USD.price) *
            currentAmount;

      const newResult = `${format(amount)} ${currence1?.symbol} = ${format(
        value
      )} ${currence2.symbol}`;

      setResult(newResult);
    }
  }, [currence1, currence2, amount]);

  const chengeCurrence = () => {
    setCurrence1(currence2);
    setCurrence2(currence1);
  };

  const chengeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  };

  const findCurrence = (value: string) => {
    return currencies.find(({ slug }) => value === slug);
  };

  return (
    <Wrapper>
      <Title>Cryptocurrency Converter Calculator</Title>

      <div>
        <Amound>Amound</Amound>
        <Input type="number" value={amount} onChange={chengeAmount} />
      </div>
      <Currencies>
        <Select<string, { value: string; children: string }>
          showArrow
          showSearch
          optionFilterProp="children"
          value={currence1?.slug}
          onChange={(value) => setCurrence1(findCurrence(value))}
          filterOption={(input, option) =>
            option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {currencies.map((currence) => (
            <Select.Option key={currence.slug} value={currence.slug}>
              {`${currence.name} (${currence.symbol})`}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={chengeCurrence} icon={<SwapOutlined />} />

        <Select<string, { value: string; children: string }>
          showArrow
          optionFilterProp="children"
          showSearch
          value={currence2?.slug}
          onChange={(value) => setCurrence2(findCurrence(value))}
          filterOption={(input, option) =>
            option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {currencies.map((currence) => (
            <Select.Option key={currence.slug} value={currence.slug}>
              {`${currence.name} (${currence.symbol})`}
            </Select.Option>
          ))}
        </Select>
      </Currencies>
      <Result>{result}</Result>
    </Wrapper>
  );
}
