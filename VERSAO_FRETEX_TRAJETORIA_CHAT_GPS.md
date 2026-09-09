# FRETEX — Trajetória + Chat + GPS Real + Simulação GPS (v2.1)

Esta versão transforma o tracking num módulo híbrido: **GPS real persistente** para operação e **simulação local** separada para demonstrações.

## GPS real

- O Dashboard Motorista envia latitude, longitude, precisão, velocidade e direção.
- O servidor valida os valores e rejeita coordenadas inválidas ou saltos GPS impossíveis.
- Cada ponto real é guardado em `gps_trajetoria` no MySQL.
- O cliente recebe os pontos por Socket.IO em tempo real.
- Ao recarregar a página ou reconectar o Socket.IO, o cliente pede a trajetória guardada e recupera o último ponto conhecido.
- A trajetória real é desenhada como linha contínua no mapa.
- A rota planeada continua separada como linha tracejada.
- O ETA é recalculado com OSRM periodicamente a partir da posição real até ao destino, com fallback por distância.
- A rota de condução é recalculada automaticamente durante o tracking.
- Quando a ligação cai, o painel identifica a perda de ligação e o Socket.IO tenta reconectar; após reconectar a trajetória é recuperada.
- Ao finalizar o frete, o tracking é encerrado no cliente e o motorista deixa de enviar localização.

## Simulação GPS

- Botão `▶ Simular GPS` no Dashboard Cliente.
- A simulação percorre a rota no navegador.
- A simulação **não grava pontos em `gps_trajetoria`** e **não envia localizações falsas para o servidor**.
- O painel identifica claramente `GPS SIMULADO — demonstração`.
- Ao parar a simulação, o modo real permanece independente.

## Histórico

A tabela `gps_trajetoria` permite recuperar até 1000 pontos de um frete através do evento Socket.IO `pedir_trajetoria` / `trajetoria_frete`.

## Estrutura principal

- `server.js` — validação, persistência, recuperação e distribuição GPS.
- `public/js/motorista-socket.js` — captura GPS real do dispositivo.
- `public/js/cliente-socket.js` — mapa, trajetória, recuperação, ETA, recálculo e simulação.
- `gps_trajetoria` — histórico persistente dos pontos GPS reais.

## Teste rápido

1. Iniciar MySQL/XAMPP.
2. Executar `npm install` se necessário.
3. Executar `npm start`.
4. Entrar como cliente e motorista.
5. Criar e aceitar um frete.
6. Iniciar a entrega no Dashboard Motorista.
7. No cliente, abrir **Acompanhar**.
8. Com GPS real autorizado, observar o marcador e a linha contínua.
9. Desligar/religar a ligação ou recarregar o cliente: a trajetória guardada deve ser recuperada.
10. Para apresentação, usar `▶ Simular GPS`: esta operação fica identificada como demonstração e não altera o histórico real.
