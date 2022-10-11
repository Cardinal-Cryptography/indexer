#!/bin/bash

set -evx

# start archiver component
tmux new-session -s indexer -d 'docker-compose -f docker-compose.archive.yml up';

# start db for the squid
tmux new-window -t "indexer:1";
tmux send-keys -t "indexer:1" 'docker-compose -f docker-compose.squiddb.yml up' Enter;

# start squid
tmux new-window -t "indexer:2";
tmux send-keys -t "indexer:2" 'make migrate && make build && make process' Enter;

# start API server
tmux new-window -t "indexer:3";
tmux send-keys -t "indexer:3" 'make serve' Enter;

tmux a;

exit $?
