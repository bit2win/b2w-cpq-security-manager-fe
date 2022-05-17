import URLUtils from './URLUtils';

/**
 * Basic Test Example
 */
test('example', () => {
    expect(URLUtils.getProtocol()).toBe('http:');
});
