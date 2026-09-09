# FRETEX — Fluxo completo Cliente → Motorista → Entrega

## Fluxo implementado
1. Cliente cria frete.
2. Frete é guardado no MongoDB com `codigoFrete` público (ex.: `FR-...`).
3. Apenas motoristas autenticados recebem o novo frete.
4. Motorista vê dados do cliente, origem, destino, carga e ganho.
5. Motorista aceita; a operação é atómica e só o primeiro motorista consegue aceitar.
6. Cliente recebe `frete_aceito` imediatamente e passa a ver o motorista.
7. Cliente e motorista podem usar o chat; as mensagens ficam no MongoDB.
8. Motorista inicia a entrega; o estado passa para `em_andamento`.
9. Cliente recebe a atualização de estado.
10. Motorista envia GPS a cada poucos segundos.
11. A trajetória é guardada em MongoDB e enviada apenas ao cliente/motorista daquele frete.
12. Cliente acompanha o motorista no mapa.
13. Motorista finaliza; o estado passa para `entregue`.
14. Cliente e motorista recebem a confirmação e o frete aparece no histórico.
15. Ao recarregar a página, os fretes são sincronizados novamente a partir do MongoDB.

## Arranque
```bat
npm install
node server.js
```

## Teste
Use duas sessões/janelas:
- sessão 1: Cliente
- sessão 2: Motorista

Crie um frete no cliente, aceite no motorista, inicie a entrega, permita a localização no navegador e finalize.
