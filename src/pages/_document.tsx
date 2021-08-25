/* eslint-disable prettier/prettier */
import { extractCritical } from '@emotion/server';
import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const page = await ctx.renderPage();
        const styles = extractCritical(page.html);

        return {
            ...initialProps,
            ...page,
            styles: (
                <>
                    {initialProps.styles}
                    <style
                        data-emotion-css={styles.ids.join(' ')}
                        dangerouslySetInnerHTML={{ __html: styles.css }}
                    />
                    {/* <style
                        type="text/css"
                        dangerouslySetInnerHTML={{ __html: mediaStyles }}
                    /> */}
                </>
            ),
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Polyfill Intl.NumberFormat, its dependencies & en, vi locale data */}
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
