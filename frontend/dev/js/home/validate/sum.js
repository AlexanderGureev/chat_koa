export default function sum(...elements) {
    return elements.reduce((prev, curr) => prev + curr);
}