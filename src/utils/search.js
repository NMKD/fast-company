export const search = (text, data) => {
    return data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
    );
};
