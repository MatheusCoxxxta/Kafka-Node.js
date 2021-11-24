# Micro-serviço com Node.js

- Utilizando Kafka;
- Utilizando Node;
- Utilizando TypeScript

## Aplicações

- API principal
- Geração de certificado

## FLuxo

- API principal envia uma mensagem pro serviço de cerificado para gerar certificado;
- Micro-serviço de certificado devolve resposta (síncrona/assíncrona);
