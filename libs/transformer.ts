import { API, FileInfo, Transform } from 'jscodeshift';

const transform: Transform = (fileInfo: FileInfo, api: API, options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    return root.find(j.CallExpression, {
        callee: {
            object: { name: 'foo' },
            property: { name: 'bar' },
        },
    })
        .forEach((path) => {
            j(path).replaceWith(
                j.callExpression(
                    j.memberExpression(
                        j.identifier('foo'),
                        j.identifier('baz'),
                    ),
                    path.value.arguments,
                ),
            );
        }).toSource();
};

export default transform;
