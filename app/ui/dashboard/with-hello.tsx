"use client";
import React, { ComponentType, useEffect, useState } from "react";

interface WithHelloProps {
  Component: ComponentType<any>;
}

export default function WithHello({ Component }: WithHelloProps) {
  return function WrappedComponent(
    props: React.ComponentProps<typeof Component>
  ) {
    const [hello, setHello] = useState("hola");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      new Promise<string>((resolve) => {
        setTimeout(() => resolve("hello from HOC"), 2000);
      }).then((response) => {
        setHello(response);
        setLoading(false);
      });
    }, []);

    if (loading) return <p>loading ...</p>;

    return <Component {...props} hello={hello} />;
  };
}
