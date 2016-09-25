# Find Eulerian Tour
#
# Write a function that takes in a graph
# represented as a list of tuples
# and return a list of nodes that
# you would follow on an Eulerian Tour
#
# For example, if the input graph was
# [(1, 2), (2, 3), (3, 1)]
# A possible Eulerian tour would be [1, 2, 3, 1]

def find_eulerian_tour(graph, node_start=None, cycle_only=True):
    if len(graph) == 0:
        if node_start is None:
            return []
        return [node_start]

    node_start = graph[0][0] if node_start is None else node_start

    for chosen_edge in [x for x in graph if node_start in x]:
        (node_a, node_b) = chosen_edge
        path = find_eulerian_tour([e for e in graph if e != chosen_edge],
                         node_b if node_start == node_a else node_a,
                         cycle_only=False)
        if path is not False and (not cycle_only or node_start == path[-1]):
            return [node_start] + path
    return False

# find_eulerian_tour([(2, 3), (3, 1), (1, 2)])
print find_eulerian_tour([(1, 13), (1, 6), (6, 11), (3, 13),
                    (8, 13), (0, 6), (8, 9),(5, 9), (2, 6),
                    (6, 10), (7, 9), (1, 12), (4, 12),
                    (5, 14), (0, 1),  (2, 3), (4, 11),
                    (6, 9), (7, 14),  (10, 13)])