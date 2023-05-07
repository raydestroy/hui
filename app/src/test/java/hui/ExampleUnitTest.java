package hui;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class ExampleUnitTest {
    public static File xunhuanchongmingming(File wj2, int shu) {

        String wenjianming = wj2.getName();

        File xinwenjian = null;
        if (wj2.isDirectory()) {
            String xinwenjianming = wenjianming + "(" + shu + ")";
            String lujing = wj2.getParent();

            xinwenjian = new File(lujing + File.separator + xinwenjianming);
            if (xinwenjian.exists()) {

                return xunhuanchongmingming(wj2, shu + 1);
            }
            //xinwenjian.mkdirs();
        } else {
            int aa = wenjianming.lastIndexOf('.');
            if (aa == -1) {

                String xinwenjianming = wenjianming + "(" + shu + ")";
                String lujing = wj2.getParent();
                xinwenjian = new File(lujing + File.separator + xinwenjianming);
                if (xinwenjian.exists()) {
                    return xunhuanchongmingming(wj2, shu + 1);
                }

            } else {

                String xinwenjianming = wenjianming.substring(0, aa) + "(" + shu + ")" + wenjianming.substring(aa);
                String lujing = wj2.getParent();
                xinwenjian = new File(lujing + File.separator + xinwenjianming);
                if (xinwenjian.exists()) {
                    return xunhuanchongmingming(wj2, shu + 1);
                }


            }
        }
        return xinwenjian;
    }
    /**
     *
     * @param f
     * @param wenjianming
     * @param  daxiao 兆大小
     * @return
     */
    public static String fengewenjian(File f, String wenjianming,int  daxiao) {
        InputStream reader = null;
        try {

            if (f.isFile() && f.exists()) {
                reader = new FileInputStream(f);

                byte[] buffer = new byte[ daxiao];
                int count;
                boolean diyig = true;

                while ((count = reader.read(buffer)) != -1) {

                    File ff = new File(f.getAbsolutePath().split(f.getName())[0] + wenjianming);

                    if (diyig) {
                        diyig = false;
                        if (ff.exists()) {

                            ff = xunhuanchongmingming(ff, 1);
                            wenjianming = ff.getName();
                        }
                    }
                    ff = xunhuanchongmingming(ff, 1);

                    FileOutputStream fos = new FileOutputStream(ff);
                    fos.write(buffer, 0, count);
                    fos.close();

                }


            }
            return "成功";
        } catch (Exception e) {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    // TODO 自动生成的 catch 块
                    e1.printStackTrace();
                }
            }
            e.printStackTrace();
        }
        return "失败";
    }

    @Test
    public void addition_isCorrect() {
        String chengong= fengewenjian(new File("D:\\xiazai\\a.gif"), "bba", 100*1024);

        System.out.println(" B:" + chengong);
    }
}