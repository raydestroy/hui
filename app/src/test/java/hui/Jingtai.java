package hui;

import java.io.*;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Locale;

public class Jingtai {   public static final boolean DAYIN = true;


    public static void a(String ex) {
        if (DAYIN) {
            System.out.println(ex);
        }

    } public static File xunhuanchongmingming(File wj2, int shu) {

        String wenjianming = wj2.getName();
        //  hui.Jingtai.a("0xinwenjian"+wenjianming);

        File xinwenjian = null;
        if (wj2.isDirectory()) {
            String xinwenjianming = wenjianming + "(" + shu + ")";
            String lujing = wj2.getParent();

            xinwenjian = new File(lujing + File.separator + xinwenjianming);
            // hui.Jingtai.a("1xinwenjian"+lujing + File.separator + xinwenjianming);
            if (xinwenjian.exists()) {

                return xunhuanchongmingming(wj2, shu + 1);
            }
        } else {
            int aa = wenjianming.lastIndexOf('.');
            if (aa == -1) {

                String xinwenjianming = wenjianming + "(" + shu + ")";
                String lujing = wj2.getParent();
                xinwenjian = new File(lujing + File.separator + xinwenjianming);
                //hui.Jingtai.a("2xinwenjian"+lujing + File.separator + xinwenjianming);
                if (xinwenjian.exists()) {
                    return xunhuanchongmingming(wj2, shu + 1);
                }

            } else {

                String xinwenjianming = wenjianming.substring(0, aa) + "(" + shu + ")" + wenjianming.substring(aa);
                String lujing = wj2.getParent();
                // hui.Jingtai.a("0xinwenjian" + lujing + File.separator + xinwenjianming);
                xinwenjian = new File(lujing + File.separator + xinwenjianming);
                // hui.Jingtai.a("xinwenjian" + xinwenjian.exists());
                if (xinwenjian.exists()) {
                    return xunhuanchongmingming(wj2, shu + 1);
                }


            }
        }
        return xinwenjian;
    }

    public static String huoqudaxiao(long number) {

        float result = number;
        String value;
        String suffix;
        if (result > 900) {
            suffix = "KB";
            result = result / 1024;
            // value = String.format(Locale.getDefault(), "%.2f", result);
            if (result > 900) {
                suffix = "MB";
                result = result / 1024;
                // value = String.format(Locale.getDefault(), "%.2f", result);
            }
            if (result > 900) {
                suffix = "GB";
                result = result / 1024;
                // value = String.format(Locale.getDefault(), "%.2f", result);
            }
            if (result > 900) {
                suffix = "TB";
                result = result / 1024;
                // value = String.format(Locale.getDefault(), "%.2f", result);
            }
            if (result > 900) {
                suffix = "PB";
                result = result / 1024;
                // value = String.format(Locale.getDefault(), "%.2f", result);
            }
            value = String.format(Locale.getDefault(), "%.2f", result);
        } else {
            suffix = "B";
            value = String.valueOf(number);
        }

        return value + " " + suffix;

    }
}
