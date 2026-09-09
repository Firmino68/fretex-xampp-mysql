# FRETEX GPS — arquitetura v2.1

## O que foi resolvido

| Requisito | Implementação |
|---|---|
| Histórico da trajetória | `gps_trajetoria` no MySQL |
| Guardar pontos GPS | inserção de cada ponto real validado |
| Última posição | último ponto da trajetória + recuperação no cliente |
| Perda de conexão | badge de estado + Socket.IO reconnection |
| Reconexão | pedido automático da trajetória após `connect` |
| Validação | latitude/longitude, accuracy, speed, heading e anti-salto |
| ETA | OSRM periódico + fallback Haversine |
| Rota recalculada | OSRM automático durante tracking |
| Encerramento | motorista para envio ao finalizar; cliente limpa tracking ativo |
| Simulação | somente local no cliente, sem persistência e sem emissão para servidor |

## Separação real vs. simulação

**Real:**
`GPS do motorista → Socket.IO → servidor → MySQL + cliente`

**Simulação:**
`rota OSRM/interpolada → navegador do cliente → marcador`

A simulação não passa pelo evento `localizacao_motorista` e não cria linhas na tabela `gps_trajetoria`.
