package com.cbn.myapplication;
// Android大TXT文本文档读取
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.CharBuffer;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.widget.ScrollView;

import androidx.annotation.RequiresApi;

public class MainActivity extends Activity implements
        SwanTextView.OnPreDrawListener {

    private static final String LOG_TAG = "BigTxtReader";
    private static final int BUF_SIZE = 124 * 2;
    private static final int BUF_SHOW = 3;

    private static final int ARROW_UP = 1;
    private static final int ARROW_DOWN = 2;

    private static String ENCODING = "UTF-8";

    private InputStreamReader mIsReader = null;
    private Uri mUri = null;
    private SwanTextView mTextShow;
    private ScrollView mScrollView;
    private String mStringShow = null;
    private StringBuilder mStringBuilder = null;

    private boolean mReadNext    = true;
    private boolean mReadBack    = false;
    private boolean mStopThread  = false;

    private int mPreBottom  = -1;
    private int mCurBottom  = -1;
    private int mReadBufNum = 0;
    private int mBuffHeight = -1;
    private int mPreScrollY = -1;

    private final Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case ARROW_DOWN:
                    System.out.println("CharBuffer) msg.obj"+(CharBuffer) msg.obj);
                    mTextShow.setText((CharBuffer) msg.obj);
                    break;
                case ARROW_UP:
                    mTextShow.setText((CharBuffer) msg.obj);
                    mScrollView.scrollTo(0, mBuffHeight);
                    break;
                default:
                    super.handleMessage(msg);
            }
        }
    };

    @RequiresApi(api = Build.VERSION_CODES.M)
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        try {
            //检测是否有写的权限
            int permission =  checkSelfPermission(
                    Manifest.permission.WRITE_EXTERNAL_STORAGE);
            if (permission != PackageManager.PERMISSION_GRANTED) {
                // 没有写的权限，去申请写的权限，会弹出对话框
                requestPermissions(  new String[]{
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
//                return false;
            }
        } catch (Exception e) {
//            Jingtai.shangchuanyichang(e);
        }
        mUri = getIntent().getData();

        mScrollView = (ScrollView) findViewById(R.id.text_show_scroll);

        mTextShow = (SwanTextView) findViewById(R.id.text_show);
        mTextShow.setOnPreDrawListener(this);

        new TextShowTask().execute(mUri);
    }

    private void showText(Uri uri1) throws IOException, InterruptedException {
        System.out.println("CharBuffer) msg.obj2 " +Environment.getExternalStorageDirectory().getPath() + File.separator +"0.txt"  );

        mIsReader = new InputStreamReader(new FileInputStream(
                Environment.getExternalStorageDirectory().getPath() + File.separator +"0.txt"), ENCODING);
        System.out.println("CharBuffer) msg.obj3 " +mIsReader.toString() );

        mStringBuilder = new StringBuilder();
        int initBufSize = BUF_SIZE * (BUF_SHOW - 1);
        char[] buf = new char[BUF_SIZE];
        System.out.println("CharBuffer) msg.obj1 "  +initBufSize);

        while (!mStopThread) {
            int scrollY = mScrollView.getScrollY();
            System.out.println("scrollY "  +scrollY+"mPreScrollY"+mPreScrollY+"mCurBottom"+mCurBottom);

            if (mCurBottom == scrollY && mPreScrollY < scrollY) {
                mReadNext = true;
                mReadBack = false;
            } else if (mReadBufNum > BUF_SHOW && 0 == scrollY && mPreScrollY != scrollY) {
                mReadNext = false;
                mReadBack = true;
            }

            mPreScrollY = scrollY;

            int len = -1;
            if (mReadNext && (len = mIsReader.read(buf)) > 0) {
                mReadNext = false;
                mReadBufNum++;
                System.out.println("加载下一个 to read back");

                if (mStringBuilder.length() > initBufSize) {
                    mStringBuilder.delete(0, BUF_SIZE);
                    mPreBottom = mCurBottom;

                    Message msg = mHandler.obtainMessage(ARROW_DOWN);
                    msg.obj = CharBuffer.wrap(mStringBuilder.toString());
                    mHandler.sendMessage(msg);

                    mStringShow = mStringBuilder.append(buf, 0, len).toString();
                } else {
                    while (mStringBuilder.length() < initBufSize) {
                        mStringBuilder.append(buf);
                        mIsReader.read(buf);
                        mReadBufNum++;
                    }

                    mStringBuilder.append(buf);
                    Message msg = mHandler.obtainMessage(ARROW_DOWN);
                    msg.obj = CharBuffer.wrap(mStringBuilder.toString());
                    mHandler.sendMessage(msg);
                }
            } else if (mReadBack && mReadBufNum > BUF_SHOW) {
                System.out.println("Prepare to read back");
                mReadBack = false;
                mIsReader.close();
                new BackBufReadThread(mStringBuilder).start();
            }
        }
    }

    private class TextShowTask extends AsyncTask<Object, Object, Object> {
        @Override
        protected void onPostExecute(Object param) {
            Log.d(LOG_TAG, "Send broadcast");
        }

        @Override
        protected Object doInBackground(Object... params) {
//            Uri uri = (Uri) params[0];
//            uri = Uri.parse(Environment.getExternalStorageDirectory().getPath() + File.separator +"0.txt");

            try {
                showText(null);
            } catch (Exception e) {
                e.printStackTrace();
//                Log.d(LOG_TAG, "Exception", e);
            }

            return null;
        }
    }

    private class BackBufReadThread extends Thread {
        StringBuilder mSbPre = null;

        public BackBufReadThread(StringBuilder sb) {
            mSbPre = sb.delete(0, sb.length());
        }

        @Override
        public void run() {
            try {
                mIsReader = new InputStreamReader(new FileInputStream(
                        mUri.getPath()), ENCODING);

                char[] buf = new char[BUF_SIZE];
                int i = 0;
                while((mReadBufNum - BUF_SHOW) > ++i && mIsReader.read(buf) > 0) {
                    // Just to skip the inputstream. Any better methods?
                }
                mReadBufNum--;

                for (i = 0; i < BUF_SHOW; i++) {
                    mIsReader.read(buf);
                    mSbPre.append(buf);
                }


//                mSbPre.delete(mSbPre.length() - BUF_SIZE, mSbPre.length()).insert(0, buf);
                Message msg = mHandler.obtainMessage(ARROW_UP);
                msg.obj = CharBuffer.wrap(mSbPre.toString());
                mHandler.sendMessage(msg);
            } catch (Exception e) {
                Log.d(LOG_TAG, "Exception", e);
            }
        }
    }

    public void onPreDraw(int bottom) {
        mCurBottom = bottom - mScrollView.getHeight();

        if (!TextUtils.isEmpty(mStringShow)) {
            // Use the last deleted buff to evaluate the height
            mBuffHeight = mPreBottom - mScrollView.getScrollY();

            // Set the text to add new content without flash the view
            Message msg = mHandler.obtainMessage(ARROW_DOWN);
            msg.obj = CharBuffer.wrap(mStringShow);
            mHandler.sendMessage(msg);

            mStringShow = null;
        }
    }

    @Override
    public void finish() {
        mStopThread = true;
        super.finish();
    }
}