function buildGraph(pairs) {
    const graph = {};
    for (const [a, b] of pairs) {
        if (!graph[a]) graph[a] = [];
        if (!graph[b]) graph[b] = [];
        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

function findPath(graph, start, target) {
    const visited = new Set();
    const queue = [start];
    const parent = {}; 
    parent[start] = null;

    while (queue.length > 0) {
        const node = queue.shift();
        if (node === target) {
            const path = [];
            let current = target;
            while (current !== null) {
                path.push(current);
                current = parent[current];
            }
            path.reverse(); 
            return path;
        }
        visited.add(node);
        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor) && !(neighbor in parent)) {
                queue.push(neighbor);
                parent[neighbor] = node;
            }
        }
    }
    return null; 
}

function isFriend(x, y, pairs) {
    const graph = buildGraph(pairs);
    const path = findPath(graph, x, y);
    if (path) {
        return true + " " + path.join(" – ");
    } else {
        return false;
    }
}

const pairs = [["A", "B"], ["B", "D"], ["D", "C"]];
console.log(isFriend("A", "C", pairs)); 
console.log(isFriend("A", "F", pairs)); 
