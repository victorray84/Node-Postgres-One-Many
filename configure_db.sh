echo "Configuring grads-offers-node"

dropdb -U postgres grads-offers-node
createdb -U postgres grads-offers-node

psql -U postgres grads-offers-node < ./db/grads-offers-node.sql



echo "grads-offers-node"